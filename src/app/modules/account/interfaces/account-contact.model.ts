import { TypeContacts } from "../enums/contact-type.enum";

export interface AccountContactInfo {
    type: TypeContacts;
    contact: string;
    mask: string; 
    activate: boolean;
}