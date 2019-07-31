export class Filter {
    public propertyName : string;
    public propertyValue : string;
    public operation : string;

    constructor(propertyName: string, propertyValue: string, operation: string) {
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
        this.operation = operation;
    }
}
