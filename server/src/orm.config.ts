import { TypeOrmModuleOptions } from '@nestjs/typeorm';

let ormconfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'sqlite',
  database: '../target/sqlite-dev-db.sql',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/domain/*.entity{.ts,.js}']
};

if (process.env.NODE_ENV === 'prod') {
  ormconfig = {
    name: 'default',
    type: 'sqlite',
    database: '../target/sqlite-prod-db.sql',
    synchronize: true,
    logging: false,
    entities: [__dirname + '/domain/*.entity{.ts,.js}']
  };
}

export { ormconfig };
