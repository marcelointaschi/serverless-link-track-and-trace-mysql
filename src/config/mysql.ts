const connectionOptions: any = {
host     : process.env.ENDPOINT,
database : process.env.DATABASE,
user     : process.env.USERNAME,
password : process.env.PASSWORD,
port     : process.env.PORT
};

export default connectionOptions;