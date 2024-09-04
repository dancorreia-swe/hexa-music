export interface RegisterUserDto {
  email: string;
  profileImage: string;
  username: string;
  type: 'COMMON' | 'ARTIST';
  password: string;
}
