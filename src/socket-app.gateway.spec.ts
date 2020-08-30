import { Test, TestingModule } from '@nestjs/testing';
import { SocketAppGateway } from './socket-app.gateway';

describe('SocketAppGateway', () => {
  let gateway: SocketAppGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketAppGateway],
    }).compile();

    gateway = module.get<SocketAppGateway>(SocketAppGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
