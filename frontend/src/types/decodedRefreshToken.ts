export interface DecodedRefreshToken {
    token_type: string;
    exp: number;
    iat: number;
    jti: number;
    user_id: number;
    email: string;
}