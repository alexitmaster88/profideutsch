export const getColor = (color: string, loading = false, disabled = false) => {
    switch (color) {
        case 'primary':
            return `border-transparent text-white ${loading || disabled
                ? 'bg-primary text-opacity-90'
                : 'bg-primary hover:bg-primary-800 ' +
                'focus:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-800 '
                }`;
        case 'secondary':
            return `border-transparent  ${loading || disabled
                ? 'text-primary-400 bg-primary-50 '
                : 'text-primary-700 bg-primary-100 hover:bg-primary-50 focus:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 '
                }`;
        case 'info':
            return `border-transparent ${loading || disabled
                ? 'bg-sky-500'
                : 'text-white bg-sky-400 hover:bg-sky-500 focus:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 '
                }`;
        case 'danger':
            return `border-transparent text-white ${loading || disabled
                ? 'bg-red-400'
                : 'bg-red-500 hover:bg-red-400 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 '
                }`;
        case 'success':
            return `border-transparent text-white ${loading || disabled
                ? 'bg-green-400'
                : 'bg-green-500 hover:bg-green-400 focus:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 '
                }`;
        case 'warning':
            return `border-transparent ${loading || disabled
                ? 'text-gray-500 bg-yellow-200'
                : 'text-black bg-yellow-300 hover:bg-yellow-200 focus:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-200 '
                }`;
        case 'white':
            return `border-gray-300 ${loading || disabled
                ? 'text-gray-400 bg-gray-50'
                : 'text-gray-700 bg-white hover:text-gray-500 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 '
                }`;
        default:
            return `border-gray-300  ${loading || disabled
                ? 'text-gray-400 '
                : 'text-gray-700 bg-white hover:text-gray-500 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 '
                }`;
    }
};
