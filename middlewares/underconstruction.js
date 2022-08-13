const underconstruction = (req, res, next) => {
    res.json({
        message:
            'The API is Under Construction, I am working on it. Sorry for inconvenience.',
    });
};

module.exports = underconstruction;
