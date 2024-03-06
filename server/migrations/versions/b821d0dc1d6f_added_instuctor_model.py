"""added instuctor model

Revision ID: b821d0dc1d6f
Revises: 228fff358323
Create Date: 2024-03-05 15:51:17.865462

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b821d0dc1d6f'
down_revision = '228fff358323'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('instructors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('bio', sa.String(), nullable=False),
    sa.Column('experience', sa.Integer(), nullable=False),
    sa.Column('instrument', sa.String(), nullable=False),
    sa.Column('photo', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_instructors')),
    sa.UniqueConstraint('email', name=op.f('uq_instructors_email')),
    sa.UniqueConstraint('name', name=op.f('uq_instructors_name'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('instructors')
    # ### end Alembic commands ###
