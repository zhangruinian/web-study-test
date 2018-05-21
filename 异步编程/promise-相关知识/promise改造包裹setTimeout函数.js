function  saySomething(data){
    console.log(data)
}
setTimeout(() => saySomething("2 seconds passed"), 2000);

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(2000).then(() => saySomething("2 seconds promise")).catch((err) =>{
    console.log(err)
});