
import { CommunicationService } from "../Services/CommunicationService";


export class SessionService {
    private comm: CommunicationService = CommunicationService.getInstance();

    public IsLoggedIn:boolean;

    public constructor() {
        this.IsLoggedIn = false;
    }

}