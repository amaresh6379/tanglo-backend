module.exports = (sequelize, Datatype) => {
  const Content = sequelize.define("content", {
    id: {
      type: Datatype.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    content: {
      type: Datatype.STRING,
      allowNull: false
    },
    sectionId: {
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
    index: {
      type: Datatype.INTEGER,
      allowNull: false
    },
    tamilContent: {
      type: Datatype.STRING,
      allowNull: false
    },
    isConversation: {
      type: Datatype.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'content',
    schema: 'tanglo',
    underScored: true

  })
  Content.association = (model) => {
    Content.belongsTo(model.section, { foreignKey: 'sectionId' });
    Content.hasMany(model.mistake, { foreignKey: 'contentId' });
  }
  return Content;
}