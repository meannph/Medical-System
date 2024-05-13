const config = {
    user: "sa",
    password: "Med123456",
    server:"localhost",
    database:"med",
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'SQLEXPRESS'
    },
    port : 1433
}
module.exports = config; 