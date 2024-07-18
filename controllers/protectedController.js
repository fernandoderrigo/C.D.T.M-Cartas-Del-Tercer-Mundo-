// Maneja la ruta /profile
export const getProfile = (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ error: 'User not authenticated' });
    }
};

// Maneja la ruta /data
export const getData = (req, res) => {
    res.json({ message: 'This is some protected data' });
};

// Maneja la ruta /error
export const handleError = (req, res) => {
    try {
        throw new Error('Something went wrong!');
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};
