const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY  );


const createBill = async () => {

    try {
        const payload={
            "country": "ZMW",
            "customer": "+",
            "amount": 100,
            "recurrence": "ONCE",
            "type": "AIRTIME",
            "reference": "930rwrwr0049404444"
         }
        
        const response = await flw.Bills.create_bill(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


export default createBill();