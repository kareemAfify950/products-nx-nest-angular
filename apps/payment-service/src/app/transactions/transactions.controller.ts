import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service'; // Updated import
import { AuthGuard } from '@products-space/auth-jwt';

@UseGuards(AuthGuard) // Apply guard here
@Controller('transactions') // Update the endpoint as needed
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    async createTransaction(
        @Body() createPaymentDto: { productId: string; },
        @Req() req
    ) {
        const { productId } = createPaymentDto;
        const userId = req.user?.sub;
        return this.transactionsService.createTransaction(userId, productId);
    }

    // TODO: It's should be /transactions?userId and add ValidateUserGuard that validate the userId in query match in JWT
    @Get()
    async getTransactions(@Req() req) {
        console.log(req.user)
        return this.transactionsService.getUserTransactions(req.user.sub);
    }
}
