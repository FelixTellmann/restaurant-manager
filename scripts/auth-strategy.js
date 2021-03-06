import {Strategy} from 'passport-shopify';
import User from '../models/user';
import Shop from '../models/shop';

/*================ .env Variables ================*/
const appApiKey = process.env.SHOPIFY_API_KEY;
const appApiSecret = process.env.APP_API_SECRET;
const appURI = process.env.CONFIG_NGROK_URL;
const appScopes = process.env.APP_SCOPES;
const appGrantOptions = process.env.APP_GRANT_OPTIONS || false;

class AuthStrategy {
    constructor(shop, state) {
        const ShopifyStrategy = new Strategy({
            clientID: appApiKey,
            clientSecret: appApiSecret,
            callbackURL: appURI + '/auth/shop',
            scope: appScopes,
            shop: shop
        }, async (accessToken, refreshToken, params, profile, done) => {
            /*================ Find or Insert Shop ================*/
            const shop = await Shop.findOneAndUpdate(
                {
                    shop: profile.id
                },
                {
                    $setOnInsert: {
                        shop: profile.id,
                        shop_URI: profile.profileURL,
                        shop_name: profile.username,
                        email: profile.emails[0].value,
                        scope: params.scope,
                        access_token: accessToken,
                        charge_approved: false,
                        users: []
                    }
                },
                {
                    new: true,
                    upsert: true
                });

            if (appGrantOptions) { // If Online access_token is required based on user Scope Levels
                /*================ Find, Update or Insert User ================*/
                const user = await User.findOneAndUpdate(
                    {
                        id: params.associated_user.id
                    },
                    {
                        id: params.associated_user.id,
                        shop_URI: profile.profileURL,
                        first_name: params.associated_user.first_name,
                        last_name: params.associated_user.last_name,
                        email: params.associated_user.email,
                        associated_scope: params.associated_user_scope,
                        access_token: params.access_token
                    },
                    {
                        upsert: true, new: true,
                        runValidators: true
                    });

                /*================ Find Shop & AddToSet User._id ================*/
                await Shop.findOneAndUpdate(
                    {
                        shop: profile.id
                    },
                    {
                        $addToSet: {
                            users: user._id
                        }
                    });

                return done(null, user);
            } else { // If Offline access_token is required based App requested Scope
                return done(null, shop);
            }
        });

        ShopifyStrategy.authorizationParams = () => {
            return {
                state: state,
                'grant_options[]': appGrantOptions
            };
        };
        return ShopifyStrategy;
    };
}

export default AuthStrategy;
