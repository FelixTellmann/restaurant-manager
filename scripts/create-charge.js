import fetch from "node-fetch";
import Charge from "../models/charge";
import Shop from "../models/shop";

/*================ Import Settings from environemnt file for easy App changes ================*/
const chargeName = process.env.APP_CHARGE_NAME;
const application_charge = process.env.APP_CHARGE_ONCE;
const chargeTrialDays = process.env.APP_CHARGE_TRIAL_DAYS;
const chargeTerms = process.env.APP_CHARGE_TERMS;
const recurring_application_charge = process.env.APP_CHARGE_REOCCURRING;
const chargeCap = process.env.APP_CHARGE_CAP;
const chargeTest = process.env.APP_CHARGE_TEST === 'true' || false;
const appURI = process.env.CONFIG_NGROK_URL;


const createCharge = async (req, res, next) => {
    let options = {
        method: 'POST',
        headers: {
            'X-Shopify-Access-Token': req.user.access_token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    /*================ Use Application Charge Method for One Time Charges ================*/
    if (application_charge > 0) {
        options['body'] = JSON.stringify({
            application_charge: {
                name: chargeName,
                price: application_charge,
                return_url: appURI + '/auth/charge/activate',
                trial_days: chargeTrialDays,
                test: chargeTest
            }
        });
        options['chargeType'] = 'application_charge';
    }

    /*================ Use Recurring Application Charge Method for Monthly Repeating Charges ================*/
    if (recurring_application_charge > 0) {
        options['body'] = JSON.stringify({
            recurring_application_charge: {
                name: chargeName,
                price: recurring_application_charge,
                return_url: appURI + '/auth/charge/activate',
                trial_days: chargeTrialDays,
                capped_amount: chargeCap,
                terms: chargeTerms,
                test: chargeTest
            }
        });
        options['chargeType'] = 'recurring_application_charge';
    }

    /*================ If no Charge is setup, activate free charge to fast forward the chargeCheck ================*/
    if (application_charge <= 0 && recurring_application_charge <= 0) {
        options = false;
    }

    /*================ If there is a charge - create charge & redirect to confirmation_url ================*/
    if (options) {
        const data = await (await fetch(`https://${req.user.shop_URI}/admin/${options.chargeType}s.json`, options)).json();
        const charge = await Charge.findOneAndUpdate(
            {
                id: data[Object.keys(data)[0]].id
            },
            {
                $setOnInsert: {
                    id: data[Object.keys(data)[0]].id,
                    type: Object.keys(data)[0],
                    data: {...data[Object.keys(data)[0]]}
                }
            },
            {
                new: true,
                upsert: true
            });
        res.redirect(charge.data.confirmation_url);
    } else {
        /*================ If there is no charge, create a db entry with datetime & charge approval ================*/
        await Shop.findOneAndUpdate(
            {
                shop_URI: req.user.shop_URI
            },
            {
                charge_approved: true,
                charge_activated_date: Date.now()
            });
        next();
    }
};

export default createCharge;