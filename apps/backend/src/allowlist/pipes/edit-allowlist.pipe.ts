import {
    Injectable,
} from '@nestjs/common';

import { CreateAllowlistPipe } from './create-allowlist.pipe';

@Injectable()
export class EditAllowlistPipe extends CreateAllowlistPipe { }
