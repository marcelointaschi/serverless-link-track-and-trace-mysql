import 'source-map-support/register';
import { formatRedirectResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import connectionOptions from '../../config/mysql'

const tracker = async (event) => {

  console.log(event)
  console.log(event.queryStringParameters.url);

  const sql = `INSERT INTO tracker(ACTION_TYPE, ORIGIN_TYPE, ORIGIN_VALUE, DESTINATION, CUSTOMER_ID ) VALUES('REDIRECT','${event.queryStringParameters.origin_type}','${event.queryStringParameters.origin_value}','${event.queryStringParameters.url}','${event.queryStringParameters.id}')`;

  const db = require("mysql-sync-query");  

  const dbObj = new db(connectionOptions.database);

  async function start() {  
    dbObj.connectLocal(connectionOptions.host, 3306, connectionOptions.user, connectionOptions.password);  
    try {  
        let res = await dbObj.executeQuery(sql);  
        console.log(res);  
    }  
    catch (err) {  
        console.log(err);  
    }  
    finally {  
        dbObj.disconnect();  
    }  
  }  
  
  start(); 
  
  return formatRedirectResponse(event.queryStringParameters.url);
}

export const main = middyfy(tracker);
