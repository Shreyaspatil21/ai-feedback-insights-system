export class Database {
    constructor() {
        this.reviews = [];
    }

    async addReview(review) {
        this.reviews.unshift(review);
    }

    async getReviews() {
        return this.reviews;
    }
}
