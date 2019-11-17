import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import UserService from '../../../services/UserService';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(email: string): Promise<boolean> {
        return UserService.getUserByEmail(email).then(user => {
            if (user) return false;
            return true;
        });
    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint
        });
    };
}
