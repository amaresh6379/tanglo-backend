module.exports = (sequelize, Datatype) => {
  const Section = sequelize.define("section", {
    id: {
      type: Datatype.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Datatype.STRING,
      allowNull: false
    },
    dayId: {
      type: Datatype.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: Datatype.BOOLEAN,
      defaultValue: false
    },
    dynamicWidth: {
      type: Datatype.INTEGER,
      allowNull: false
    },
    title: {
      type: Datatype.STRING
    },
    description: {
      type: Datatype.STRING
    },
    createdAt: {
      type: Datatype.DATE,
      defaultValue: Datatype.NOW
    },
    modifiedAt: {
      type: Datatype.DATE,
      defaultValue: Datatype.NOW
    }

  }, {
    tableName: 'section',
    schema: 'tanglo',
    underScored: true
  })
  Section.association = (model) => {
    Section.belongsTo(model.day, { foreignKey: 'day_id' });
    Section.hasMany(model.content, { foreignKey: 'sectionId' });
  }
  return Section;
}