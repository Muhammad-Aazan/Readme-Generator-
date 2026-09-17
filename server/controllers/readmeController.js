const Readme = require('../models/Readme');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const memoryReadmes = [];

const getReadmes = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let readmes = [];
    try {
      readmes = await Readme.find({ userId }).sort({ updatedAt: -1 });
    } catch (e) {
      readmes = memoryReadmes.filter(r => String(r.userId) === String(userId));
    }
    return successResponse(res, { readmes });
  } catch (error) {
    next(error);
  }
};

const getReadmeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let readme = null;
    try {
      readme = await Readme.findById(id);
    } catch (e) {
      readme = memoryReadmes.find(r => String(r._id) === String(id));
    }

    if (!readme) {
      return errorResponse(res, 'README not found', 404, 'NOT_FOUND');
    }

    // Safety check: only author can view private README
    const userId = req.user ? (req.user._id || req.user.id) : null;
    if (!readme.isPublic && (!userId || String(readme.userId) !== String(userId))) {
      return errorResponse(res, 'Not authorized to view this private README', 403, 'FORBIDDEN');
    }

    return successResponse(res, { readme });
  } catch (error) {
    next(error);
  }
};

const getPublicReadme = async (req, res, next) => {
  try {
    const { username, slug } = req.params;
    let readme = null;
    try {
      readme = await Readme.findOne({ slug, isPublic: true });
    } catch (e) {
      readme = memoryReadmes.find(r => r.slug === slug && r.isPublic);
    }

    if (!readme) {
      return errorResponse(res, 'Public README not found', 404, 'NOT_FOUND');
    }

    return successResponse(res, { readme });
  } catch (error) {
    next(error);
  }
};

const createReadme = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const readmeData = { ...req.body, userId };

    let createdReadme;
    try {
      createdReadme = await Readme.create(readmeData);
    } catch (e) {
      createdReadme = {
        _id: 'rdm_' + Date.now(),
        ...readmeData,
        createdAt: new Date(),
        updatedAt: new Date(),
        versions: [{ versionNumber: 1, savedAt: new Date(), markdown: readmeData.markdown || '' }]
      };
      memoryReadmes.push(createdReadme);
    }

    return successResponse(res, { readme: createdReadme }, 'README created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateReadme = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    let readme = null;
    try {
      readme = await Readme.findById(id);
    } catch (e) {
      readme = memoryReadmes.find(r => String(r._id) === String(id));
    }

    if (!readme) {
      return errorResponse(res, 'README not found', 404, 'NOT_FOUND');
    }

    if (String(readme.userId) !== String(userId)) {
      return errorResponse(res, 'Not authorized to modify this README', 403, 'FORBIDDEN');
    }

    let updatedReadme;
    try {
      // Snapshot version if markdown changed
      if (req.body.markdown && req.body.markdown !== readme.markdown) {
        const nextVersion = (readme.versions ? readme.versions.length : 0) + 1;
        if (!readme.versions) readme.versions = [];
        readme.versions.push({
          versionNumber: nextVersion,
          savedAt: new Date(),
          markdown: req.body.markdown
        });
      }
      Object.assign(readme, req.body);
      updatedReadme = await readme.save();
    } catch (e) {
      Object.assign(readme, req.body, { updatedAt: new Date() });
      updatedReadme = readme;
    }

    return successResponse(res, { readme: updatedReadme }, 'README updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteReadme = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    let readme = null;
    try {
      readme = await Readme.findById(id);
    } catch (e) {
      readme = memoryReadmes.find(r => String(r._id) === String(id));
    }

    if (!readme) {
      return errorResponse(res, 'README not found', 404, 'NOT_FOUND');
    }

    if (String(readme.userId) !== String(userId)) {
      return errorResponse(res, 'Not authorized to delete this README', 403, 'FORBIDDEN');
    }

    try {
      await Readme.findByIdAndDelete(id);
    } catch (e) {
      const idx = memoryReadmes.findIndex(r => String(r._id) === String(id));
      if (idx !== -1) memoryReadmes.splice(idx, 1);
    }

    return successResponse(res, null, 'README deleted successfully');
  } catch (error) {
    next(error);
  }
};

const duplicateReadme = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    let original = null;
    try {
      original = await Readme.findById(id);
    } catch (e) {
      original = memoryReadmes.find(r => String(r._id) === String(id));
    }

    if (!original) {
      return errorResponse(res, 'Original README not found', 404, 'NOT_FOUND');
    }

    const dupData = original.toObject ? original.toObject() : { ...original };
    delete dupData._id;
    delete dupData.createdAt;
    delete dupData.updatedAt;
    dupData.userId = userId;
    dupData.name = original.name + ' (Copy)';
    dupData.slug = (original.slug || 'profile-readme') + '-copy-' + Date.now();

    let duplicated;
    try {
      duplicated = await Readme.create(dupData);
    } catch (e) {
      duplicated = {
        _id: 'rdm_' + Date.now(),
        ...dupData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      memoryReadmes.push(duplicated);
    }

    return successResponse(res, { readme: duplicated }, 'README duplicated successfully', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReadmes,
  getReadmeById,
  getPublicReadme,
  createReadme,
  updateReadme,
  deleteReadme,
  duplicateReadme
};