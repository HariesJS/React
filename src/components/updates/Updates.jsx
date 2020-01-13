import React, { Fragment } from 'react';
import '../../App.css';
import Wrapper from '../hoc/Wrapper';

const Updates = () => {
    let upd = <span className='new-update'>new</span>
    return (
        <Fragment>
            <div className='wrapper-updates'>
                <Wrapper>
                    <div className='updates-block'>
                        <div className='updates-title'>Update 2.1</div>
                        <div className='updates-info'>Во втором обновлении доработаны и исправлены некоторые элементы, а именно:</div>
                        <ul>
                            <li>Фиксированная навигация сайта;</li>
                            <li>Добавление раздела обновлений;</li>
                            <li>При авторизации/выходе появляется надпись соответствующая надпись;</li>
                            <li>Возможность задавать второстепенный цвет сайта;</li>
                            <li>Переключатель между страницами теперь адаптивный;</li>
                            <li>Список пользователей, на которых вы подписаны теперь отображается в вашем профиле;</li>
                            <li>Исправлены некоторые баги, связанные с профилем; {upd}</li>
                            <li>Добавлена админ-панель; {upd}</li>
                        </ul>
                        <div className='updates-end'>
                            <div>Ну а на этом пока все, спасибо за то, что Вы остаетесь с нами!</div>
                            <div>С уважаением, команада Haries Network!</div>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </Fragment>
    );
}

export default Updates;