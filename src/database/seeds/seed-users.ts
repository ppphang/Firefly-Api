import dataSource from '../data-source';
import { User } from '../../users/user.entity';

async function run() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(User);
  const u = repo.create({ name: 'Alice', email: 'alice@example.com' });
  await repo.save(u);
  await dataSource.destroy();
}

run().catch(async (e) => {
  console.error(e);
  if (dataSource.isInitialized) await dataSource.destroy();
  process.exit(1);
});

