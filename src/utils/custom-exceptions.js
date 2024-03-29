export class UserNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class IncorrectLoginCredentials extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class UserAlreadyExists extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class CartNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProductNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class CartWithoutStock extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class IncompleteValues extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class isOldPasswordError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ExpiredJWT extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class EmailNotMatchToken extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class OwnerCantAddProduct extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class CantDeleteProduct extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class EmptyDocuments extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class CanNotChangeRole extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class TicketNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ProductWhitoutStock extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}