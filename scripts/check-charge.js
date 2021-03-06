import Shop from '../models/shop';

const chargeRenew = process.env.APP_CHARGE_RENEW === 'true' || false;
const development = process.env.CONFIG_DEVELOPMENT === 'true' || false;

const checkCharge = async (req, res, next) => {
    const shop = await Shop.findOne({shop_URI: req.user.shop_URI});
    if (shop.charge_approved && !chargeRenew) {
        return development ? res.redirect('http://localhost:3001/') : res.redirect('https://' + req.user.shop_URI + '/admin/apps/' + process.env.SHOPIFY_API_KEY);
    } else {
        next();
    }
};

export default checkCharge;