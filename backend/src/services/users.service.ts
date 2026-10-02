import type { CreateUserInput, UsersRepository } from '../repositories/users.respository.ts'

export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getByClerkUserId(clerkUserId: string) {
        return this.usersRepository.findByClerkUserId(clerkUserId)
    }

    async syncUser(input: CreateUserInput) {
        const existingUser = await this.usersRepository.findByClerkUserId(input.clerkUserId)

        if(!existingUser) {
            return this.usersRepository.create(input)
        }

        return this.usersRepository.updateProfile(input.clerkUserId, {
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName
        })
    }
}