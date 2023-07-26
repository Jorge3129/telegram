import dataSource from '../src/data-source';

beforeAll(async () => {
  await dataSource.initialize();
  await dataSource.dropDatabase();
});

beforeEach(async () => {
  await dataSource.runMigrations();
});

afterEach(async () => {
  await dataSource.dropDatabase();
});

afterAll(async () => {
  await dataSource.destroy();
});
