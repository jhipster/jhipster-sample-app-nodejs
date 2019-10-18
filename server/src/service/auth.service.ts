import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { AuthorityRepository } from '../repository/authority.repository';
import { UserService } from '../service/user.service';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  constructor(
    @InjectRepository(AuthorityRepository) private authorityRepository: AuthorityRepository,
    private userService: UserService,

  ) { }


  async findUserOrSave(loginUser: User): Promise<User | undefined> {
    let userFound = await this.userService.findByfields({ where: { login: loginUser.login }, relations: ['authorities'] });

    if (!userFound) {
      const authoritiesName = [];
      loginUser.authorities.forEach(authority => authoritiesName.push({ name: authority }));
      userFound = Object.assign({}, loginUser);
      userFound.authorities = authoritiesName;
      await this.userService.save(userFound);
    }
    this.logger.log('user :' + JSON.stringify(loginUser));
    return loginUser;
  }

}
