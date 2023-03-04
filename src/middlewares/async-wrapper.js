export default async (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(500).json({ msg: 'Failed', error: error.message });
  }
};
