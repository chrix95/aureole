module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Book', {
        name: DataTypes.STRING,
        isbn: DataTypes.STRING,
        // authors: DataTypes.JSON,
        authors: {
            type: DataTypes.TEXT,
            get: function() {
                return JSON.parse(this.getDataValue("authors"));
            },
            set: function(value) {
                return this.setDataValue("authors", JSON.stringify(value));
            }
        },
        country: DataTypes.STRING,
        number_of_pages: DataTypes.INTEGER,
        publisher: DataTypes.STRING,
        release_date: DataTypes.DATEONLY
    })
}