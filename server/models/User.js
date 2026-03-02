const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['CEO', 'Manager', 'Recruiter', 'Staff'],
        default: 'Staff'
    },
    isPromoted: {
        type: Boolean,
        default: false
    }
});

// Method to promote or demote user
userSchema.methods.setRole = function(newRole) {
    if (this.role === 'CEO' || newRole === 'Staff') {
        this.role = newRole;
        this.isPromoted = newRole !== 'Staff';
    } else {
        throw new Error('Only CEO can promote or demote users');
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;