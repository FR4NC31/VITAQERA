import type { CreateUserInput, UsersRepository } from '../repositories/users.repository.ts'

export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getByClerkUserId(clerkUserId: string) {
        return this.usersRepository.findByClerkUserId(clerkUserId)
    }

    async syncUser(input: CreateUserInput) {
        return this.usersRepository.upsert(input);
    }
}