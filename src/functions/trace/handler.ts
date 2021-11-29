import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import connectionOptions from '../../config/mysql'


const trace: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const sql = `INSERT INTO tracker(ACTION_TYPE, ORIGIN_TYPE, ORIGIN_VALUE, DESTINATION, CUSTOMER_ID ) VALUES('${event.body.action_type}','${event.body.origin_type}','${event.body.origin_value}','${event.body.destination}','${event.body.customer_id}')`;

  const db = require("mysql-sync-query");  

  const dbObj = new db(connectionOptions.database);

  async function start() {  
    dbObj.connectLocal(connectionOptions.host, connectionOptions.port, connectionOptions.user, connectionOptions.password);  
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


  return formatJSONResponse({
    message: `The trace was successfully created`
  });
}

export const main = middyfy(trace);
