var mysql      = require("mysql");
let db = 'giphy_schema'

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.MySQL_USER,
    password : process.env.MySQL_PW,
    database : db
});

 
connection.connect();

//Should get messages in console if connected to db
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    console.log('You Are Connected to the Database!')
});

const ExampleParams = {
    type: "create", // CRUD TYPE: "create", "read", "update", "delete"
    table: "ratings", //Table you want to query
    values: { //Values for 'create' and 'update' key = column_name // value = row_value
        gif_id: "kl;j324kladf", 
        rating: "3", 
        user_id: 1
    },
    options: {}, //object of one key value pair for WHERE sql statement (e.g. options: {id: "3"} == WHERE id = "3")
    join:{} //joins table {join: {table: "users", on: "users.id", from:"user_id"} == LEFT JOIN users ON user_id = users.id}
}

module.exports.db_query = async (params) => {
    return new Promise((resolve, reject) =>{
        if(params.type.toLowerCase() === "create"){
            let columns = []
            let values = []
            for(const key in params.values){
                columns.push(key)
                values.push(`"${params.values[key]}"`)
            }
            let query = `INSERT INTO ${params.table} (${columns.join(', ')}, createdAt, updatedAt) VALUES (${values.join(', ')}, NOW(), NOW())`
            console.log("RUNNING SQL QUERY: ", query)
            connection.query(query, (error, results, fields) => {
                if (error){
                    console.log("ERROR", `${error.sqlMessage} SQL RAN: ${error.sql} ErroNo: ${error.errno}`)
                    reject({message: `Something went wrong! error number: ${error.errno}`})
                }else{
                    resolve(results.insertId)
                } 
            })
        }
        if(params.type.toLowerCase() === "read"){
            let searchKey = ""
            let joinStatement = ""
            let aliases = ""
            for(let key in params.options){
                searchKey += key
            }
            if(params.join !== undefined){
                joinStatement = `LEFT JOIN ${params.join.table} ON ${params.join.on} = ${params.join.from}`
            }
            for(let key in params.aliases){
                aliases += `, ${key} AS ${params.aliases[key]}`
            }
            let query = `SELECT *${aliases} from ${params.table} ${joinStatement} WHERE ${searchKey} = "${params.options[searchKey]}" ORDER BY ${params.table}.id desc`
            console.log("RUNNING SQL QUERY: ", query)
            connection.query(query, (error, results, fields) => {
                if (error){
                    console.log("ERROR", `${error.sqlMessage} SQL RAN: ${error.sql} ErroNo: ${error.errno}`)
                    reject({message: `Something went wrong! error number: ${error.errno}`})
                }else{
                    resolve(results)
                } 
            })
        }
        if(params.type.toLowerCase() === "update"){
            let columns = []
            for(const key in params.values){
                columns.push(`${key} = "${params.values[key]}"`)
            }
            let query = `UPDATE ${params.table} SET ${columns.join(", ")} WHERE id = ${params.options.id}`
            console.log("RUNNING SQL QUERY: ", query)
            connection.query(query, (error, results, fields) => {
                if (error){
                    console.log("ERROR", `${error.sqlMessage} SQL RAN: ${error.sql} ErroNo: ${error.errno}`)
                    reject({message: `Something went wrong! error number: ${error.errno}`})
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
                    }else{
                        console.log("RESULTS: ", results)
                        if(results.affectedRows == 0 ){
                            reject({message: "Id Not Found"})
                        }
                        resolve("success")
                    } 
                })
        }
        
    })
}



