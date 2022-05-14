const ynab = require("ynab");
const accessToken = "youraccesstoken";
const ynabAPI = new ynab.API(accessToken);
const budgetId = "yourbudgetid";
async function createTransaction(payee_input, amount_input, memo_input) {
    const transaction = {
        account_id: "youraccountid",
        payee_name: payee_input,
        cleared: ynab.SaveTransaction.ClearedEnum.Cleared,
        approved: true,
        date: ynab.utils.getCurrentDateInISOFormat(),
        amount: amount_input,
        memo: memo_input
    };
    try {
        await ynabAPI.transactions.createTransaction(budgetId, { transaction});
        console.log()
    }
    catch (err) {
        const error = err.error;
        console.log(`ERROR: id=${error.id}; name=${error.name}; detail: ${error.detail}`);
    }
};
createTransaction("John Doe2",10000,"Testings")