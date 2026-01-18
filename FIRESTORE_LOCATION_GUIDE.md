# Firestore Database Location Guide

## For India (SRM Institute of Science and Technology)

### Best Locations (in order of preference):

1. **asia-south1** (Mumbai, India) - ⭐ BEST CHOICE
   - Closest to India
   - Lowest latency
   - Best performance

2. **asia-southeast1** (Singapore)
   - Good for India
   - Low latency
   - Reliable

3. **asia-east1** (Taiwan)
   - Acceptable for India
   - Moderate latency

### If Asia locations not available:

4. **africa-south1** (South Africa)
   - Closer than North America/Europe
   - Acceptable latency

5. **eur3** (Europe)
   - Further away, higher latency

6. **nam5 / nam7** (North America)
   - Furthest, highest latency
   - Not recommended for India

## How to Select:

1. **Use arrow keys** to scroll through all options
2. **Look for `asia-south1`** first
3. If not available, choose the closest Asia location
4. If no Asia locations, choose `africa-south1`
5. **Press Enter** to confirm

## Important Notes:

- ⚠️ **Location cannot be changed later!** Choose carefully.
- ✅ All locations work, but closer = faster
- ✅ Choose the same location for Storage (when you set it up)
- ✅ Free tier works in all locations

## After Selection:

The setup will continue with:
- Firestore rules file location
- Indexes file location
- etc.

---

**Recommendation:** Scroll to find `asia-south1` (Mumbai) if possible, otherwise choose the closest Asia location available.
