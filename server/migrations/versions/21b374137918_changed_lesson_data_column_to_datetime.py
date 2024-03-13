"""changed lesson data column to datetime

Revision ID: 21b374137918
Revises: 150ca5105bf0
Create Date: 2024-03-13 10:38:25.466920

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '21b374137918'
down_revision = '150ca5105bf0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('lessons', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_time', sa.DateTime(), nullable=True))
        batch_op.drop_column('date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('lessons', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.DATE(), nullable=True))
        batch_op.drop_column('date_time')

    # ### end Alembic commands ###