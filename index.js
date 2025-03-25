import taostats from '@api/taostats';
import 'dotenv/config';

async function main() {
    taostats.auth(process.env.TAOSTATS_API_KEY);
    const validatorData = await taostats.getValidatorDtao({
        hotkey: '5GKH9FPPnWSUoeeTJp19wVtd84XqFW4pyK2ijV2GsFbhTrP1' // this is the hotkey of the validator - here we are using taostats' hotkey as an example
    });

    const validatorDataWithLimit = await taostats.getValidatorHistoryDtao({
        hotkey: '5GKH9FPPnWSUoeeTJp19wVtd84XqFW4pyK2ijV2GsFbhTrP1',
        limit: 7
    });

    // get validator's current apy
    const currentData = validatorData.data.data[0];

    // get validator's apy for the last 7 days
    // console.log("Validator Data from the last 7 days");
    const sevenDaysData = validatorDataWithLimit.data.data.slice(0, 7);
    // console.log(sevenDaysData);

    // iterate through the data and calculate the average apy also display each apy for the last 7 days
    let totalApy = 0;
    sevenDaysData.forEach((data, index) => {
        const apy = (data.nominator_return_per_day / data.root_stake) * 365 * 100;
        totalApy += apy;
        console.log(`Day ${index + 1} APY: ${apy}%`);
    });
    const averageApy = totalApy / sevenDaysData.length;
    console.log(`Average APY for the last 7 days: ${averageApy}%`);

    const apy = (currentData.nominator_return_per_day / currentData.root_stake) * 365 * 100;
    console.log(`Validator's current APY: ${apy}%`);
}

await main()
