var mysql      = require('mysql');
let db = 'giphy_schema'
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.MySQL_PW,
    database : db
});

 
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    console.log('You Are Connected to the Database!')
});

const params = {
    type: "create",
    table: "ratings",
    values: {
        gif_id: "kl;j324kladf", 
        rating: "3", 
        user_id: 1
    },
    options: ""
}

module.exports.db_query = async (params) => {
    return new Promise((resolve, reject) =>{
        if(params.type.toLowerCase() === "create"){
            let columns = []
            let values = []
            for(const key in params.values){
                columns.push(key)
                values.push(`'${params.values[key]}'`)
            }
            let query = `INSERT INTO ${params.table} (${columns.join(', ')}, createdAt, updatedAt) VALUES (${values.join(', ')}, NOW(), NOW())`
            console.log("RUNNING SQL QUERY: ", query)
            connection.query(query, (error, results, fields) => {
                if (error){
                    console.log("ERROR", `${error.sqlMessage} SQL RAN: ${error.sql} ErroNo: ${error.errno}`)
                    reject({message: `Something went wrong! error number: ${error.errno}`})
                    // throw error;
                }else{
                    console.log("RESULTS: ", results.insertId)
                    // console.log("FIELDS: ", fields)
                    resolve(results.insertId)
                } 
            })
        }
        if(params.type.toLowerCase() === "read"){
            let searchKey = ""
            for(let key in params.options){
                searchKey += key
            }
            let query = `SELECT * from ${params.table} WHERE ${searchKey} = '${params.options[searchKey]}'`
            console.log("RUNNING SQL QUERY: ", query)
            connection.query(query, (error, results, fields) => {
                if (error){
                    console.log("ERROR", `${error.sqlMessage} SQL RAN: ${error.sql} ErroNo: ${error.errno}`)
                    reject({message: `Something went wrong! error number: ${error.errno}`})
                    // throw error;
                }else{
                    console.log("RESULTS: ", results)
                    resolve(results)
                } 
            })
        }
        if(params.type.toLowerCase() === "update"){
            let columns = []
            for(const key in params.values){
                columns.push(`${key} = '${params.values[key]}'`)
            }
            let query = `UPDATE ${params.table} SET ${columns.join(', ')} WHERE id = ${params.options.id}`
            console.log("RUNNING SQL QUERY: ", query)
            connection.query(query, (error, results, fields) => {
                if (error){
                    console.log("ERROR", `${error.sqlMessage} SQL RAN: ${error.sql} ErroNo: ${error.errno}`)
                    reject({message: `Something went wrong! error number: ${error.errno}`})
                    // throw error;
                }else{
                    console.log("RESULTS: ", results.message)
                    if(results.affectedRows == 0 ){
                        reject({message: "Id Not Found"})
                    }
                    resolve(results.message)
                } 
            })
        }
        if(params.type.toLowerCase() === "delete"){
            let query = `DELETE FROM ${params.table} WHERE id = ${params.options.id}`
            console.log("RUNNING SQL QUERY: ", query)
                connection.query(query, (error, results, fields) => {
                    if (error){
                        console.log("ERROR", `${error.sqlMessage} SQL RAN: ${error.sql} ErroNo: ${error.errno}`)
                        reject({message: `Something went wrong! error number: ${error.errno}`})
                        // throw error;
                    }else{
                        console.log("RESULTS: ", results)
                        // console.log("FIELDS: ", fields)
                        if(results.affectedRows == 0 ){
                            reject({message: "Id Not Found"})
                        }
                        resolve("success")
                    } 
                })
        }
        
    })
}

// db_query(params)

// connection.end();
