module.exports = (sequelize, Datatype) => {
  const Mistake = sequelize.define("mistake", {
    id: {
      type: Datatype.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    word: {
      type: Datatype.STRING,
    },
    contentId: {
      type: Datatype.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: Datatype.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: Datatype.DATE,
      defaultValue: Datatype.NOW
    },
    modifiedAt: {
      type: Datatype.DATE,
      defaultValue: Datatype.NOW
    },
    mistake: {
      type: Datatype.STRING
    },
    description: {
      type: Datatype.STRING
    },
    highlights: {
      type: Datatype.STRING
    }

  }, {
    tableName: 'mistake',
    schema: 'tanglo',
    underScored: true

  })
  Mistake.association = (model) => {
    Mistake.belongsTo(model.content, { foreignKey: 'contentId' });
  }
  return Mistake;
}