import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tokens, TokensDocument } from './schema/tokens.schema';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export class TokensService {
  constructor(
    @InjectModel(Tokens.name) private tokensModel: Model<TokensDocument>,
  ) {}

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '14d',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '360d',
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: ObjectId, refreshToken: string) {
    const tokenData = await this.tokensModel.findOne({ user: userId });
    console.log(!!tokenData);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokensModel.create({
      user: userId,
      refreshToken: refreshToken,
    });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokensModel.deleteOne({
      refreshToken: refreshToken,
    });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await this.tokensModel.findOne({
      refreshToken: refreshToken,
    });
    return tokenData;
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}
