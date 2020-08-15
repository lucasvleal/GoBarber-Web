import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    > header {
        height: 144px;
        background: #28262e;

        display: flex;
        align-items: center;

        > div {
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;

            svg {
                color: #999591;
                width: 30px;
                height: 30px;
                transition: color 0.2s;

                &:hover {
                    color: #FF9000;
                }
            }
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    margin: -120px auto 0;

    width: 100%;

    form {
        margin: 30px 0;
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column;

        h1 {
            font-size: 20px;
            text-align: left;
            margin-bottom: 24px;
        }

        a {
                color: #F4EDE8;
                display: block;
                margin-top: 24px;
                text-decoration: none;
                transition: color 0.2s;


                &:hover {
                    color: ${shade(0.2, '#F4EDE8')};
                }


            svg {
                margin-right: 16px;
            }
        }

        input[name='oldPassword'] {
            margin-top: 24px;
        }
    }
`;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    align-self: center;

    img {
        width: 170px;
        height: 170px;
        border-radius: 50%;
    }

    label {
        position: absolute;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #FF9000;
        right: 0;
        bottom: 0;
        border: 0;
        transition: background-color 0.2;

        display: flex;
        justify-content: center;
        align-items: center;

        input {
            display: none;

            &:hover {
                cursor: pointer;
            }
        }

        svg {
            width: 20px;
            height: 20px;
            color: #312e38;
        }

        &:hover {
            background: ${shade(0.2, '#F99000')}
        }
    }
`;
