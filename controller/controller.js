const { client } = require("../db");


const add = async (req, res) => {
    try {
        const cust_name = req.body.cust_name
        const order_name = req.body.order_name
        const cust_id = req.body.cust_id
        console.log("start excecution.......")
        let resp;
        if (req.body.cust_name && req.body.order_name && req.body.cust_id){
            resp = await client.query(
               `INSERT INTO customers(cust_name) VALUES('${cust_name}');
   
               INSERT INTO orders(order_name,cust_id) VALUES
               ('${order_name}',${cust_id})`);
       }else if(req.body.cust_name){
             resp = await client.query(
                `INSERT INTO customers(cust_name) VALUES('${cust_name}');`);
        }else if(req.body.order_name && req.body.cust_id){
            resp = await client.query(
               `INSERT INTO orders(order_name,cust_id) VALUES
               ('${order_name}',${cust_id})`);
           }else{
            resp = "can't insert the data "
        }
        res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
}

const find = async(req,res)=>{
    try {
        const cust_id = req.body.cust_id
        const cust_name = req.body.cust_name
        console.log("start excecution.......")
        let resp;
        if(cust_id){
             resp = await client.query(`SELECT * FROM customers,orders 
            WHERE customers.cust_id = ${cust_id} AND orders.cust_id = ${cust_id};`);
        }else if (cust_name){
            resp = await client.query(`select * FROM customers INNER JOIN 
            orders ON customers.cust_id = orders.cust_id  
            WHERE customers.cust_name ='${cust_name}'`)
        }else{
             resp = await client.query(`SELECT * FROM customers
        FULL OUTER JOIN orders ON customers.cust_id = orders.cust_id `);
        }
        res.send(resp.rows)  
    } catch (error) {
        
    }
}

const update = async(req,res)=>{
    try {
        const order_id = req.body.order_id
        const cust_id = req.body.cust_id
        const cust_name = req.body.cust_name
        const order_name = req.body.order_name
        console.log("start excecution.......")
        let resp;
        if(cust_name && cust_id){
             resp = await client.query(`UPDATE customers SET 
            cust_name = '${cust_name}' WHERE cust_id = ${cust_id}`);
        }else if(order_name && cust_id){
             resp = await client.query(`UPDATE orders SET 
            order_name = '${order_name}' WHERE cust_id = ${cust_id}`);
        }else if(order_name && order_id){
            resp = await client.query(`UPDATE orders SET 
           order_name = '${order_name}' WHERE order_id = ${order_id}`);
        }else{
            resp = "don't update"
        }
        res.send(resp)    
    } catch (error) {
        
    }
}

const remove = async (req, res) => {
    try {
        const cust_id = req.body.cust_id
        const cust_name = req.body.cust_name
        console.log("start excecution.......")
        let resp;
        if(cust_id){
         resp = await client.query(`DELETE FROM orders o USING customers c
        WHERE o.cust_id = c.cust_id and c.cust_id = ${cust_id};

        DELETE FROM customers c WHERE c.cust_id = ${cust_id};`);

    }else if (cust_name){
    resp = await database.query(`DELETE FROM orders o USING customers c
    WHERE o.cust_id = c.cust_id  and c.cust_name = '${cust_name}';

      DELETE FROM customers  c WHERE c.cust_name ='${cust_name}';`);
    }else{
        resp = "please provide valid details"
    }
    res.send(resp)
    } catch (error) {
        res.send(error.message)
    }
  }
module.exports = { add,find, update, remove}