const fetch = require('node-fetch')
async function createTransaction() {
    try {
        var jsonvalue = await(await(fetch('https://api.extraterrestrial.money/v1/txs/by_account?account=youraddress&order=desc&offset=0&limit=25'))).json();
        var timestamp = "2022-05-10T06:27:03Z"
        xindex = 0
        for(x = 0;x<25;x++){
            if(jsonvalue.txs[x].timestamp == timestamp){
                xindex = x
            }
        }
        console.log(xindex)
        for(x = 24;x>=0;x--){
            if(jsonvalue.txs[x].tx.value.msg[0].type == "bank/MsgSend"){
                var amount = 0
                var memo = jsonvalue.txs[x].tx.value.memo
                noOfDenom = jsonvalue.txs[x].tx.value.msg[0].value.amount.length
                for(y=0;y<noOfDenom;y++){
                    if(jsonvalue.txs[x].tx.value.msg[0].value.amount[y].denom == "uusd"){
                       amount = jsonvalue.txs[x].tx.value.msg[0].value.amount[y].amount
                    }
                }
                if(jsonvalue.txs[x].tx.value.msg[0].value.from_address == "youraddress"){
                    amount /= -1000000
                    payee = jsonvalue.txs[x].tx.value.msg[0].value.to_address
                }else{
                    amount /= 1000000
                    payee = jsonvalue.txs[x].tx.value.msg[0].value.from_address
                }
                console.log(payee,amount,memo)
            }
            
            
        }
        
        //console.log(jsonvalue.txs[0].tx.value.msg[0].value.coins)
       
    }
    catch (err) {
        console.log(err)
    }
};
createTransaction()
