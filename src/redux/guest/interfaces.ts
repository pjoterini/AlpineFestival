export interface GuestRegistrationFormProps {
  firstName: string
  lastName: string
  email: string
  tel: string
  arrival: Date
  departure: Date
  accomodationComment?: string
  presents: boolean
  ownsPc?: boolean
  speechLength?: string
  specialNeeds?: string
}
