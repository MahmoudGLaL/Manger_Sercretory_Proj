import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles(() => ({
    datePicker: {
        width: '13rem',
        fontWeight : '700' ,
        fontSize : '25px',
        color : 'black' ,
        height: '3rem', // Tailwind `h-10`
        padding : '0.5rem',
        paddingLeft : '3rem', // Tailwind `p-2`
        paddingRight : '3rem', // Tailwind `p-2`
        textAlign: 'left', // Tailwind `text-left`
        borderBottom: '1px solid #9e9e9e',
        fontFamily: 'inherit',

        borderRadius: '0.375rem', // Tailwind `rounded-md`
        '& .MuiInputBase-root': {
            fontSize : '19px',
            color: '#000', // Text color when filled, // Tailwind `px-4`
            paddingRight: '1rem', // Tailwind `px-4`
            textTransform: 'capitalize',
            fontWeight : '500' ,
            fontFamily: 'inherit',
        },
        '& .MuiInputBase-input': {
            color: 'black', // Placeholder color
            fontWeight : '500' ,
            fontFamily: 'inherit',
        },
        '& .MuiInput-underline:before': {
            borderBottom: '1px solid #9e9e9e', // Gray border initially
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#3b82f6', // Tailwind `outline-blue-500` for focus
        },
        '& .MuiInputAdornment-root': {
            color: '#9e9e9e', // Placeholder color for the icon as well
        },
    },
    fadeIn: {
        opacity: 1,
        transition: 'opacity 2s ease-in',
      },
      fadeOut: {
        opacity: 0,
        transition: 'opacity 2s ease-out',
      },
}));


export const useStyles2 = makeStyles(() => ({
    datePicker: {
        width: '11.1rem',
        fontWeight : '700' ,
        fontSize : '10px',
        color : 'black' ,
        height: '2.5rem', // Tailwind `h-10`
        padding: '0.1rem', // Tailwind `p-2`
        textAlign: 'left', // Tailwind `text-left`
        borderBottom: '1px solid #9e9e9e',
        fontFamily: 'inherit',

        borderRadius: '0.375rem', // Tailwind `rounded-md`
        '& .MuiInputBase-root': {
            color: '#000', // Text color when filled
            paddingLeft: '1rem', // Tailwind `px-4`
            textTransform: 'capitalize',
            fontWeight : '500' ,
            fontFamily: 'inherit',
        },
        '& .MuiInputBase-input': {
            color: 'black', // Placeholder color
            fontWeight : '500' ,
            fontFamily: 'inherit',
        },
        '& .MuiInput-underline:before': {
            borderBottom: '1px solid #9e9e9e', // Gray border initially
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'orange', // Tailwind `outline-blue-500` for focus
        },
        '& .MuiInputAdornment-root': {
            color: '#9e9e9e', // Placeholder color for the icon as well
        },
    },
    fadeIn: {
        opacity: 1,
        transition: 'opacity 2s ease-in',
      },
      fadeOut: {
        opacity: 0,
        transition: 'opacity 2s ease-out',
      },
}));
