import { mockAuthService } from '../mocks/mock-auth.service';

export const runWithOtherUser = async <T>(
  newUserId: number,
  callback: () => T | Promise<T>,
): Promise<T> => {
  const previousUserId = mockAuthService.getCurrentUserId();

  await mockAuthService.login(newUserId);

  const result = await callback();

  if (previousUserId) {
    await mockAuthService.login(previousUserId);
  } else {
    await mockAuthService.logout();
  }

  return result;
};
