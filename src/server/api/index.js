import express from 'express'

const router = express.Router();

router.get('/usersession', function ( req, res ){
	if(!req.user){
		res.json({user:false})
	}else{


		res.json({user:true})

/*
		Userprofiles.populate(req.user, {"path": "contacts"}, function (err, user){
	
			res.json(user);
		});
*/
	}

});

export default router