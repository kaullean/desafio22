import moment from 'moment';

export const formatoMensaje = (data) => {
  const { user, mensaje } = data;
  return {
    user,
    mensaje,
    time: moment().format('hh:mm:ss'),
  };
};