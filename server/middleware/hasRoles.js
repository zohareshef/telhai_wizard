
/**
 * 
 * @param {string[]} roles 
 * @returns 
 */
function hasRoles(...roles) {
	return function (req, res, next) {
		if (!roles.includes(req.auth.role)) {
			res.send(401, { message: 'Unauthorized' });
		}
		else {
			return next();
		}
	};
}

export default hasRoles;